export const toDDMMYY = (date: Date) => {
    if (date) {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
            });
        return formatted;
    } else return "No Date"
}

export const toDDMMMMYY = (date: Date) => {
    if (date) {
    const formatted = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
        });
    return formatted;
    } else return "No Date"
}
