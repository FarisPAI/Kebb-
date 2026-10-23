// Menambahkan izin lokasi dan notifikasi ke AndroidManifest.xml (aman dijalankan berulang)
const fs = require('fs');
const f = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(f, 'utf8');
const need = ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION', 'FOREGROUND_SERVICE', 'FOREGROUND_SERVICE_LOCATION', 'POST_NOTIFICATIONS'];
let add = '';
for (const p of need) {
  if (!x.includes('android.permission.' + p + '"')) {
    add += '    <uses-permission android:name="android.permission.' + p + '" />\n';
  }
}
if (add) {
  x = x.replace('<application', add + '    <application');
  fs.writeFileSync(f, x);
}
console.log(add ? 'Izin ditambahkan.' : 'Izin sudah ada.');
