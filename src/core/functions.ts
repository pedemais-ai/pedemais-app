export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function formatFileSize(sizeInBytes: number) {
    if (sizeInBytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));

    return `${parseFloat((sizeInBytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}