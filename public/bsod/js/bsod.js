const hexTimestamp = Math.floor(Date.now() / 1000).toString(16).toUpperCase();
document.getElementById('hexdate').innerHTML = hexTimestamp;