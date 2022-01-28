// import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

// exports.inviteUserToTeam = functions.firestore
//     .document('teamMembers/{userId}')
//     .onCreate(async (snap, context) => {
//       const newTeamMember = snap.data() as TeamMember;

//       // access a particular field as you would any JS property
//       const name = newValue.name;

//       // perform desired operations ...
//     });
