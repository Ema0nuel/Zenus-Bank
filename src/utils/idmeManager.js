import { supabase } from "./supabaseClient";

const BUCKET_NAME = "idme-submissions";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Upload IDME documents to Supabase storage
 * Files are stored in: userId/{PRIMARY_FRONT|PRIMARY_BACK|SELFIE}_timestamp.ext
 */
export async function uploadIDMEDocuments(userId, files) {
    const uploadedUrls = {};
    const timestamp = Date.now();

    try {
        // Upload PRIMARY_ID_FRONT
        if (files.primary_id_front) {
            uploadedUrls.primary_id_front = await uploadFile(
                userId,
                files.primary_id_front,
                `PRIMARY_FRONT_${timestamp}`
            );
        }

        // Upload PRIMARY_ID_BACK
        if (files.primary_id_back) {
            uploadedUrls.primary_id_back = await uploadFile(
                userId,
                files.primary_id_back,
                `PRIMARY_BACK_${timestamp}`
            );
        }

        // Upload SELFIE
        if (files.selfie) {
            uploadedUrls.selfie = await uploadFile(
                userId,
                files.selfie,
                `SELFIE_${timestamp}`
            );
        }

        return uploadedUrls;
    } catch (error) {
        // Clean up uploaded files on error
        for (const url of Object.values(uploadedUrls)) {
            if (url) {
                const path = url.split(`${BUCKET_NAME}/`)[1];
                await supabase.storage.from(BUCKET_NAME).remove([path]);
            }
        }
        throw error;
    }
}

/**
 * Upload single file to storage
 */
async function uploadFile(userId, file, fileName) {
    const ext = file.type === "image/webp" ? "webp" : file.name.split(".").pop();
    const filePath = `${userId}/${fileName}.${ext}`;

    const { error, data } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    // Return public URL
    const { data: publicData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicData.publicUrl;
}

/**
 * Get user's IDME submission
 */
export async function getIDMESubmission(userId) {
    const { data, error } = await supabase
        .from("idme_submissions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== "PGRST116") {
        throw error;
    }

    return data || null;
}

/**
 * Delete IDME submission and associated files
 */
export async function deleteIDMESubmission(userId, submissionId) {
    const submission = await supabase
        .from("idme_submissions")
        .select("primary_id_front_url, primary_id_back_url, selfie_url")
        .eq("id", submissionId)
        .eq("user_id", userId)
        .single();

    if (submission.error) throw submission.error;

    // Delete files from storage
    const filePaths = [
        submission.data.primary_id_front_url,
        submission.data.primary_id_back_url,
        submission.data.selfie_url,
    ]
        .filter(Boolean)
        .map((url) => url.split(`${BUCKET_NAME}/`)[1]);

    if (filePaths.length > 0) {
        const { error: deleteError } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(filePaths);
        if (deleteError) throw deleteError;
    }

    // Delete database record
    const { error } = await supabase
        .from("idme_submissions")
        .delete()
        .eq("id", submissionId)
        .eq("user_id", userId);

    if (error) throw error;
}

/**
 * Get submission history for user
 */
export async function getIDMEHistory(userId) {
    const { data, error } = await supabase
        .from("idme_submissions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}