import sendgrid from '@sendgrid/mail';

interface Email {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export const initEmail = () => {
  sendgrid.setApiKey(`${process.env.SEND_GRID_API_KEY}`);
};

export const sendEmail = async ({ to, subject, text, html }: Email) => {
  const msg = {
    to,
    from: 'cs472.roadwatch@gmail.com',
    subject,
    text,
    html,
  };

  try {
    await sendgrid.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
