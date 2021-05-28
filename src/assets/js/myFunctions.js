//Geolocation
const accessGeoLocation = () => {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)//, { enableHighAccuracy: true }
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
const getLocation = async () => {
    const position = await accessGeoLocation()
    const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
    )//No need of catch all failed requests will be catched in catch block. 400-499 status codes are considered success however you can filter it using response.ok property
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.message || 'Failed to fetch geo location.')
        throw error;
    }
    return data;
}
const fmtTime = (strTime) => {
    const time = new Date(strTime)
    const fmtTime = ('0' + time.getHours()).slice(-2) +
        ':' +
        ('0' + time.getMinutes()).slice(-2);
    return fmtTime;
}

export { getLocation, fmtTime }