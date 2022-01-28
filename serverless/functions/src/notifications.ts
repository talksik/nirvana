/* eslint-disable no-unused-vars */
import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";

import { TeamMember, TeamMemberStatus } from "../../../web/models/teamMember";

sgMail.setApiKey(
  "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"
);

enum SendgridTemplateId {
  inviteTeamMember = "d-4953372ac7b94d3fa9419bad4073840f",
}

class SendGridEmailMessage {
  to: string;
  from: string;
  templateId: SendgridTemplateId;
  dynamic_template_data: {};

  constructor(
    _to: string,
    _from: string,
    _templateId: SendgridTemplateId,
    _templateData: {}
  ) {
    this.to = _to;
    this.from = _from;
    this.templateId = _templateId;
    this.dynamic_template_data = _templateData;
  }
}

export const inviteUserToTeam = functions.firestore
  .document("teamMembers/{teamMemberId}")
  .onCreate(async (snap, context) => {
    const newTeamMember: TeamMember = snap.data() as TeamMember;
    if (newTeamMember.status == TeamMemberStatus.invited) {
      functions.logger.info(
        "New team member invited...sending email" +
          newTeamMember.inviteEmailAddress,
        { structuredData: true }
      );

      // send email to people

      return;
    }
  })
