const { db, auth } = require('../firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.detectDistress = functions.firestore
  .document('users/{userId}/emotions/{emotionId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const userId = context.params.userId;
    const db = admin.firestore();

    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentSnap = await db
      .collection(`users/${userId}/emotions`)
      .where('timestamp', '>=', tenMinutesAgo)
      .get();

    const highIntensity = recentSnap.docs.filter(
      (d) => (d.data().size || 0) > 80
    );

    const sameEmotionSnap = await db
      .collection(`users/${userId}/emotions`)
      .where('emotion', '==', data.emotion)
      .where('timestamp', '>=', twentyFourHoursAgo)
      .get();

    const shouldFlag =
      highIntensity.length >= 2 ||
      sameEmotionSnap.size >= 3 ||
      data.helpRequested === true;

    if (shouldFlag) {
      await db.collection(`users/${userId}/alerts`).add({
        flagged: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        emotions: recentSnap.docs.map((d) => d.data().emotion),
        reason: 'Distress pattern detected',
      });
    }
  });
