from django.conf import settings
from django.core.mail import send_mail


def send_forget_mail(email,token):
    subject='Forget password Link'
    message=f'Hi,click on the link to reset your password http://localhost:3000/reset_password/{token}/'
    email_form=settings.EMAIL_HOST_USER
    recipient_list=[email]
    send_mail(subject,message,email_form,recipient_list)
    return True