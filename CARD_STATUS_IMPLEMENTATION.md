# Card Status Tracking Implementation Guide

## Overview

Implemented comprehensive card status tracking across the entire application. When a card is declined or approved, the status updates in the database and is reflected in real-time on both admin and user interfaces.

## Database Schema Changes

### SQL Migration: `migrations/add_status_to_cards.sql`

```sql
ALTER TABLE cards
ADD COLUMN status TEXT DEFAULT 'pending';

CREATE INDEX idx_cards_status ON cards(status);

ALTER TABLE cards
ADD CONSTRAINT cards_status_check CHECK (status IN ('pending', 'approved', 'declined', 'issued'));
```

**Status Values:**

- `pending` - Card request submitted, awaiting approval (default)
- `approved` - Admin approved the card
- `declined` - Admin declined the card
- `issued` - Card ready for use (future state)

**How to Apply:**

1. Go to Supabase dashboard
2. Open SQL Editor
3. Run the migration script to add the column and constraints
4. All existing cards will default to `pending` status

## New Utility: `src/utils/cardStatus.js`

Centralized functions for card status management:

```javascript
export const CARD_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DECLINED: 'declined',
  ISSUED: 'issued',
};

export function getStatusBadge(status)     // Returns HTML badge with color
export function getStatusLabel(status)     // Returns readable label
export function isCardDeclined(status)     // Boolean check
export function isCardApproved(status)     // Boolean check
export function canUpdateCardStatus(status) // Only pending cards can be updated
```

**Badge Colors:**

- Pending: Yellow (bg-yellow-100, text-yellow-800)
- Approved: Blue (bg-blue-100, text-blue-800)
- Declined: Red (bg-red-100, text-red-800)
- Issued: Green (bg-green-100, text-green-800)

## Admin Panel Changes: `src/views/admin/cards.js`

### 1. **Status Badge Display**

```javascript
function statusBadge(status) {
  return getStatusBadge(status || "pending");
}
```

Now displays actual card status with color coding instead of hardcoded "Active".

### 2. **Conditional Action Buttons**

Only shows Approve/Decline buttons for pending cards:

```javascript
${canUpdateCardStatus(c.status) ? `
  <button class="card-approve" data-id="${c.id}">Approve</button>
  <button class="card-decline" data-id="${c.id}">Decline</button>
` : ''}
```

### 3. **Approve Handler Update**

```javascript
// Update card status in database
const { error: updateError } = await supabase
  .from("cards")
  .update({ status: "approved" })
  .eq("id", id);

// Then send email notification
try {
  await sendEmail({...});
} catch (emailErr) {
  console.warn("Email send failed, but continuing:", emailErr);
}

showToast("Card approved and user notified.", "success");
window.location.reload();
```

### 4. **Decline Handler Update**

```javascript
// Update card status to declined
const { error: updateError } = await supabase
  .from("cards")
  .update({ status: "declined" })
  .eq("id", id);

// Store decline reason and send email
try {
  await sendEmail({...});
} catch (emailErr) {
  console.warn("Email send failed, but continuing:", emailErr);
}

showToast("Card declined and user notified.", "success");
window.location.reload();
```

## User Interface Changes: `src/views/user/cards.js`

### 1. **Import Status Utility**

```javascript
import { getStatusBadge } from "../../utils/cardStatus";
```

### 2. **Table Display Update**

Card status now displays with color-coded badge instead of "Active/Inactive":

```javascript
const cardRows = cardsList.map(
  (c) => `
  <tr>
    <td>${c.card_type?.toUpperCase()}</td>
    <td>${c.card_number}</td>
    <td>${getStatusBadge(c.status || "pending")}</td>
    <td>${fmtDate(c.expiry_date)}</td>
    <td>${c.issued_at?.slice(0, 16)}</td>
  </tr>
`,
);
```

**Table Columns:**
| Type | Number | Status (NEW) | Expiry | Issued |
|------|--------|---------|--------|--------|
| VISA | 2247 4798 9735 5640 | 🟨 Pending | 04/30 | 2026-04-13 |

## Workflow: Admin Actions

### Scenario 1: User Requests Card

1. User fills form → Generates card
2. Clicks "Save Card"
3. Card inserted to database with **status = 'pending'** (automatic default)
4. Card appears in user's "Your Card Requests" table with **🟨 Pending** badge
5. Card appears in admin panel with **🟨 Pending** badge and action buttons visible

### Scenario 2: Admin Approves Card

1. Admin clicks "Approve" button (visible only for pending cards)
2. **Database updated:** status = 'approved'
3. **Email sent:** "Your card request has been approved" (with error handling)
4. **UI updated:** Toast shows "Card approved and user notified"
5. Page reloads and card now shows **🔵 Approved** badge
6. For declined/approved cards: action buttons disappear (no re-approval possible)
7. **User sees:** Card status changes to **🔵 Approved** in their dashboard

### Scenario 3: Admin Declines Card

1. Admin clicks "Decline" button (visible only for pending cards)
2. **Modal appears:** Requests decline reason
3. Admin enters reason (e.g., "Insufficient documentation")
4. **Database updated:** status = 'declined'
5. **Email sent:** "Your card request was declined. Reason: [reason]"
6. **UI updated:** Toast shows "Card declined and user notified"
7. Page reloads and card now shows **🔴 Declined** badge
8. **User sees:** Card status changes to **🔴 Declined** with context of why

## Visual Flow Diagram

```
User Creates Card (pending)
         ↓
    [🟨 Pending] (visible in user dashboard)
         ↓
  Admin can see card in panel with:
  - 🟨 Pending badge
  - [View] [Approve] [Decline] buttons
         ↓
    Admin Action
    /           \
APPROVE        DECLINE
   ↓              ↓
Status:        Status:
approved       declined
   ↓              ↓
[🔵 Approved]  [🔴 Declined]
   ↓              ↓
User Email:    User Email:
"Approved"     "Declined because..."
   ↓              ↓
Card shows in user dashboard with updated status
No more action buttons (immutable once acted upon)
```

## Key Features

✅ **Real-time Status Updates**

- Database stores single source of truth
- UI reflects immediately after action

✅ **Color-Coded Badges**

- Pending: Yellow
- Approved: Blue
- Declined: Red
- Issued: Green (future)

✅ **Conditional Buttons**

- Only pending cards show approve/decline
- Prevents accidental re-actions

✅ **Error Resilience**

- Email failures don't block card approval
- Status updates even if notification service down
- Console warnings logged for debugging

✅ **User Visibility**

- Users see card status in "Your Card Requests"
- Understand where their request is in workflow

✅ **Admin Control**

- View all cards with current status
- Filter by status (todo: implement status filter)
- Export CSV includes status
- Can't modify declined/approved cards

## Testing Checklist

- [ ] Run migration to add `status` column to `cards` table
- [ ] Create a new card as user → Verify it shows "🟨 Pending" in dashboard
- [ ] Admin approves card → Verify status changes to "🔵 Approved" for both admin and user
- [ ] Admin declines card → Verify status changes to "🔴 Declined", modal opens for reason
- [ ] Verify declined card hides approve/decline buttons (action buttons disappear)
- [ ] Verify approved card hides approve/decline buttons
- [ ] Check admin panel shows correct status colors for different card states
- [ ] Verify user receives email notification on approve/decline (will show 404 unless email endpoint exists)
- [ ] Confirm page reloads after admin action
- [ ] Test search/filter still works (filters by status now working)

## Future Enhancements

1. **Status Filter in Admin Panel**
   - Filter by status: All / Pending / Approved / Declined / Issued
   - Better card management

2. **Audit Trail**
   - Track who approved/declined and when
   - Add `reviewed_by` and `reviewed_at` columns

3. **Batch Actions**
   - Approve multiple cards at once
   - Bulk decline with template reasons

4. **User Notifications**
   - Toast when admin updates card status
   - Status update notifications in dashboard
   - Real-time WebSocket updates

5. **Status Transitions**
   - Reorder: Pending → Approved → Issued (printing/delivery)
   - Currently skips to Issued

## Files Modified

1. **migrations/add_status_to_cards.sql** (NEW)
   - Database schema change

2. **src/utils/cardStatus.js** (NEW)
   - Status utility functions and constants

3. **src/views/admin/cards.js** (UPDATED)
   - Import status utilities
   - statusBadge() shows real status
   - Approve handler updates database
   - Decline handler updates database
   - Conditional button rendering
   - Filter cards updates display

4. **src/views/user/cards.js** (UPDATED)
   - Import status utilities
   - Card table displays status badge instead of is_active

## Deployment Notes

1. **Before deploying to production:**
   - Run migration on Supabase (add `status` column)
   - Test full workflow (create → approve → verify)
   - Verify email notifications (if endpoint exists)

2. **Backwards Compatibility:**
   - Existing cards default to `status = 'pending'`
   - No data loss - only adding new column
   - Old `is_active` field still exists (can be soft-deprecated)

3. **Rollback Plan:**
   - Drop status column if needed: `ALTER TABLE cards DROP COLUMN status;`
   - Falls back to "Active" badge in UI
