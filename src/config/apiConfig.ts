// api config version control
export enum ApiVersion {
    V1 = 'v1/',
    V2 = 'v2/',
    V3 = 'v3/',
}

export const currentApiVersion = ApiVersion.V1;
export const apiBaseUrl = `/api/${currentApiVersion}`