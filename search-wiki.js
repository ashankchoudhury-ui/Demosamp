import fs from 'fs';

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.query && data.query.pages) {
    const pages = data.query.pages;
    return Object.values(pages).map(p => p.imageinfo[0].url);
  }
  return [];
}

async function run() {
  console.log('Whitening:', await searchCommons('teeth whitening before after'));
  console.log('Veneers:', await searchCommons('dental veneers before after'));
  console.log('Implants:', await searchCommons('dental implant before after'));
  console.log('Braces:', await searchCommons('braces before after'));
}

run();
