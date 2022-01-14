
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { NextApiRequest, NextApiResponse } from 'next';

import serviceAccount from '../../../nirvana-for-business-firebase-adminsdk.json'

initializeApp({
  credential: credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  })
});

export default validateToken = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Validating token...');
  try {
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      return res.status(403).send({
        errorCode: 403,
        message: 'Auth token missing.'
      });
    }
    const result = await validate(token);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(err.code).send({
      errorCode: err.code,
      message: err.message,
    });
  }
}