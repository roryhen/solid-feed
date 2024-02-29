const url = "https://chriscoyier.net/feed";
const res = await fetch(url);
const xml = await res.text();

const xmlParsed = new DOMParser().parseFromString(xml, "text/xml");
console.log(xmlParsed.querySelector("url").textContent);
