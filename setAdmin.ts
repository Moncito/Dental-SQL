// scripts/setAdmin.ts
import { adminAuth } from '@/lib/firebaseAdmin';

async function setAdmin(uid: string) {
  try {
    await adminAuth.setCustomUserClaims(uid, { admin: true });
    console.log(`✅ Admin claim set for UID: ${uid}`);
  } catch (err) {
    console.error('❌ Failed to set admin claim:', err);
  }
}

// Replace this with the real UID of your admin user
const ADMIN_UID = 'Xr20R8yh1cdUnbim20Wa5ZIyLgV2';

setAdmin(ADMIN_UID);
