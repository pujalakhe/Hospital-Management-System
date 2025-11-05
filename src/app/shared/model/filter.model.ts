export interface FilterOption {
    value: any;
    label: string;
}

export interface FilterColumn {
    field: string;
    header: string;
    options?: FilterOption[];
    endpoint?: string;
}