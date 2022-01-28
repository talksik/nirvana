/* eslint-disable no-unused-vars */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";
import { MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

enum SendgridTemplateId {
  inviteTeamMember = "d-4953372ac7b94d3fa9419bad4073840f",
}

const SENDER_EMAIL = "arjunpatel@berkeley.edu"

// class SendGridEmailMessage {
//   to: string;
//   from: string = "usenirvana@gmail.com"
//   templateId: SendgridTemplateId;
//   dynamic_template_data: {};

//   constructor(
//     _to: string,
//     _templateId: SendgridTemplateId,
//     _templateData: {}
//   ) {
//     this.to = _to;
//     this.templateId = _templateId;
//     this.dynamic_template_data = _templateData;
//   }
// }

type Team = {
  id: string;
  name: string;

  status: string;

  allowedUserCount: number;

  companySite: string;

  createdByUserId: string;
}

type TeamMember = {
  id: string;
  userId: string;
  teamId: string;

  inviteEmailAddress: string;
  invitedByUserId: string;
  
  role: string
  status: string
}

// onCreate of team invite to a member -> email
export const inviteUserToTeam = functions.firestore
  .document("teamMembers/{teamMemberId}")
  .onCreate(async (snap, context) => {
    const newTeamMember = snap.data() as TeamMember;

    if (!newTeamMember || !newTeamMember.inviteEmailAddress) {
      functions.logger.error("No team member email available")
      return
    }

    // only if invited will be sending invite
    if (newTeamMember.status == "invited") {
      functions.logger.info(
        "New team member invited...sending email" +
          newTeamMember.inviteEmailAddress,
        { structuredData: true }
      )

      // get team information from team id
      const snapshot = await admin.firestore().collection("teams").doc(newTeamMember.teamId).get()
      if (!snapshot.exists) {
        functions.logger.error("No team exists")
        return
      }
      const team: Team = snapshot.data() as Team;

      // send email to invited person, based on the email address
      const message: MailDataRequired = {
        from: SENDER_EMAIL,
        to: newTeamMember.inviteEmailAddress,
        templateId: SendgridTemplateId.inviteTeamMember,
        dynamicTemplateData: {
          teamName: team.name,
          subject: "Your Team is On Nirvana - " + team.name,
          joinTeamUrl: "https://usenirvana.com/teams/login",
          landingPageUrl: "https://usenirvana.com"
          }
      }

      return await sgMail.send(message)
    }

    return
  })
