import sendgrid from '@sendgrid/mail';

interface Email {
  to: string;
  subject: string;
  templateId: string;
  dynamicTemplateData: Record<string, string>;
}

export const initEmail = () => {
  sendgrid.setApiKey(`${process.env.SEND_GRID_API_KEY}`);
};

export const sendEmail = async ({
  to,
  subject,
  templateId,
  dynamicTemplateData,
}: Email) => {
  if (process.env.SEND_GRID_FROM === undefined) {
    console.error('No sender in environment. Not sending email.');
    return;
  }

  const msg = {
    to,
    from: process.env.SEND_GRID_FROM,
    subject,
    templateId,
    dynamicTemplateData,
  };

  try {
    await sendgrid.send(msg);
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordReset = (email: string, token: string) => {
  const subject = 'Password Reset';
  const templateId = process.env.SEND_GRID_RESET_PASSWORD_TEMPLATE || '';
  const dynamicTemplateData = {
    resetPasswordLink: `${process.env.LIVE_SITE}/reset-password/${token}`,
  };

  sendEmail({ to: email, subject, templateId, dynamicTemplateData });
};
