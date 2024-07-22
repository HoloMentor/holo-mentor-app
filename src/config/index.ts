export default {
    role: import.meta.env.VITE_TEMP_ROLE, // this is temporary
    api_url: formatUrl(import.meta.env.VITE_API_URL) // this formatting make sure there is a '/' at the end
};

function formatUrl(url: any) {
    if (!url) return '';

    return url.slice(-1) === '/' ? url : url + '/';
}
