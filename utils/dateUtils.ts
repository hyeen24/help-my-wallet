export const toDDMMYY = (date: Date) => {
    const formatted = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
        });
    return formatted;
}

export const toDDMMMMYY = (date: Date) => {
    const formatted = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
        });
    return formatted;
}
