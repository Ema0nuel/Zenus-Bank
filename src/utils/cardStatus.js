/**
 * Card Status Utilities
 * Handles card status display and validation
 */

export const CARD_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    DECLINED: 'declined',
    ISSUED: 'issued',
};

export function getStatusBadge(status) {
    const statusMap = {
        pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
        approved: { color: 'bg-blue-100 text-blue-800', label: 'Approved' },
        declined: { color: 'bg-red-100 text-red-800', label: 'Declined' },
        issued: { color: 'bg-green-100 text-green-800', label: 'Issued' },
    };

    const config = statusMap[status] || statusMap.pending;
    return `<span class="${config.color} px-2 py-1 rounded text-xs font-medium">${config.label}</span>`;
}

export function getStatusLabel(status) {
    const labels = {
        pending: 'Pending',
        approved: 'Approved',
        declined: 'Declined',
        issued: 'Issued',
    };
    return labels[status] || 'Unknown';
}

export function isCardDeclined(status) {
    return status === CARD_STATUS.DECLINED;
}

export function isCardApproved(status) {
    return status === CARD_STATUS.APPROVED || status === CARD_STATUS.ISSUED;
}

export function canUpdateCardStatus(status) {
    return status === CARD_STATUS.PENDING;
}
