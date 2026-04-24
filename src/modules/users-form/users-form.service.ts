import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserFormDto } from './dto/create-users-form.dto';
import { SendMailsService } from '../send-mails/send-mails.service';
import { UsersForm } from './entities/users-form.entity';
import { Program } from '../plans/entities/plan.entity';

@Injectable()
export class UsersFormService {
  private readonly logger = new Logger(UsersFormService.name);

  constructor(
    @InjectRepository(UsersForm)
    private readonly usersFormRepository: Repository<UsersForm>,
    private readonly sendMailsService: SendMailsService,
    @InjectRepository(Program)
    private readonly plansRepository: Repository<Program>,
  ) {}

  async create(createUsersFormDto: CreateUserFormDto): Promise<UsersForm> {
    const selectedProgram = await this.plansRepository.findOne({
      where: [
        { id: createUsersFormDto.plan, isActive: true },
        { title: createUsersFormDto.plan, isActive: true },
      ],
      relations: ['features'],
    });

    if (!selectedProgram) {
      throw new BadRequestException('Programa seleccionado no valido');
    }

    const featureDescriptions = selectedProgram.features.map(
      (feature) => feature.description,
    );

    const userForm = this.usersFormRepository.create({
      ...createUsersFormDto,
      plan: selectedProgram.title,
      email: createUsersFormDto.email.trim().toLowerCase(),
      phone: createUsersFormDto.phone.trim(),
      fullName: createUsersFormDto.fullName.trim(),
    });

    const savedUserForm = await this.usersFormRepository.save(userForm);

    try {
      await this.sendMailsService.sendMail({
        to: savedUserForm.email,
        subject: 'Confirmacion de Formulario de Usuario',
        text: `Hola ${savedUserForm.fullName},\n\nGracias por completar el formulario. Hemos recibido tu solicitud de plan: ${selectedProgram.title}. Nos pondremos en contacto contigo pronto via WhatsApp para continuar con el procedimiento.\n\nDetalles del plan:\n\nDescripcion: ${featureDescriptions.join('\n')}\n\nIncluye:\n${featureDescriptions.join('\n')}\n\nSiguenos en nuestras redes sociales para mas informacion.\n\nSaludos,\nFundacion Hogar Esperanza`,
        html: `<html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      color: #333;
                      margin: 0;
                      padding: 0;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: white;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      border-radius: 8px;
                    }
                    .header {
                      text-align: center;
                      margin-bottom: 20px;
                    }
                    .header img {
                      width: 100%;
                      max-width: 600px;
                      height: 50%;
                      border-radius: 8px;
                    }
                    .content {
                      font-size: 16px;
                      line-height: 1.6;
                      margin-bottom: 20px;
                    }
                    .social-icons {
                      text-align: center;
                      margin-top: 20px;
                    }
                    .social-icons a {
                      margin: 0 10px;
                      text-decoration: none;
                    }
                    .social-icons img {
                      width: 40px;
                      height: 40px;
                      transition: transform 0.3s ease;
                    }
                    .social-icons img:hover {
                      transform: scale(1.1);
                    }
                    .footer {
                      text-align: center;
                      font-size: 14px;
                      margin-top: 20px;
                      color: #777;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <img src="https://res.cloudinary.com/de5tm90td/image/upload/f_auto,q_auto/yhvkolvghzbuvg0lbxqo" alt="Fundacion Hogar Esperanza" />
                    </div>
                    <p>Hola ${savedUserForm.fullName},</p>
                    <p>Gracias por completar el formulario. Hemos recibido tu solicitud de plan: <strong>${selectedProgram.title}</strong>. Nos pondremos en contacto contigo pronto via WhatsApp para continuar con el procedimiento.</p>
                    <p><strong>Detalles del plan:</strong><br/>
                      <strong>Descripcion:</strong> ${featureDescriptions.join('<br/>')}</p>
                    <p><strong>Incluye:</strong><ul>${featureDescriptions.map((item) => `<li>${item}</li>`).join('')}</ul></p>
                    <p>Siguenos en nuestras redes sociales para mas informacion:</p>
                    <div class="social-icons">
                      <a href="https://www.instagram.com/hogaresperanza.mtr/profilecard/?igsh=YWw0NTd1NWw2eDJ1" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram"/>
                      </a>
                      <a href="https://www.facebook.com/share/GQntcxkNkuwqfqFf/?mibextid=LQQJ4d" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook"/>
                      </a>
                      <a href="https://wa.me/3013743729" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"/>
                      </a>
                    </div>
                    <div class="footer">
                      <p>Saludos,<br/>Fundacion Hogar Esperanza</p>
                    </div>
                  </div>
                </body>
              </html>`,
      });

      const whatsappLink = `https://wa.me/${savedUserForm.phone}`;

      await this.sendMailsService.sendMail({
        to: 'denebleo08@gmail.com',
        subject: 'Nuevo Registro de Usuario en el Formulario',
        text: `Se ha registrado un nuevo usuario: ${savedUserForm.fullName}\n\nCorreo electronico: ${savedUserForm.email}\n\nPrograma solicitado: ${selectedProgram.title}\n\nPuedes contactar al cliente directamente por WhatsApp en este enlace: ${whatsappLink}`,
        html: `<html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      color: #333;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: white;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      border-radius: 8px;
                    }
                    .footer {
                      text-align: center;
                      font-size: 14px;
                      margin-top: 20px;
                      color: #777;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Nuevo Registro de Usuario</h2>
                    <p><strong>Nombre del Usuario:</strong> ${savedUserForm.fullName}</p>
                    <p><strong>Correo electronico:</strong> ${savedUserForm.email}</p>
                    <p><strong>Programa solicitado:</strong> ${selectedProgram.title}</p>
                    <p><strong>Contactar por WhatsApp:</strong> <a href="${whatsappLink}" target="_blank">Haz clic aqui para chatear</a></p>
                    <div class="footer">
                      <p>Este es un mensaje automatico. No responda este correo.</p>
                    </div>
                  </div>
                </body>
              </html>`,
      });
    } catch (error) {
      this.logger.error(
        `Formulario ${savedUserForm.id} guardado, pero fallo el envio de correos.`,
        error instanceof Error ? error.stack : undefined,
      );
    }

    return savedUserForm;
  }

  async findAll(): Promise<UsersForm[]> {
    return this.usersFormRepository.find();
  }

  async findOne(id: string): Promise<UsersForm> {
    return this.usersFormRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersFormRepository.delete(id);
  }
}
