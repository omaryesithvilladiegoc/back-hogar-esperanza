import { Injectable, BadRequestException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserFormDto } from './dto/create-users-form.dto';
import { SendMailsService } from '../send-mails/send-mails.service'; // Asegúrate de importar el servicio de correos
import { UsersForm } from './entities/users-form.entity';
import programs from 'src/assets/plans';

@Injectable()
export class UsersFormService {
  constructor(
    @InjectRepository(UsersForm)
    private readonly usersFormRepository: Repository<UsersForm>, // Inyección del repositorio
    private readonly sendMailsService: SendMailsService, // Inyección del servicio de correos
  ) {}

  async create(createUsersFormDto: CreateUserFormDto): Promise<UsersForm> {
    const userForm = this.usersFormRepository.create(createUsersFormDto);
  
    // Obtener el programa seleccionado por el usuario
    const selectedProgram = programs.find(program => program.nombre === createUsersFormDto.plan);
  
    if (!selectedProgram) {
      throw new BadRequestException('Programa seleccionado no válido');
    }
  
    try {
      // Guardar el nuevo formulario de usuario
      const savedUserForm = await this.usersFormRepository.save(userForm);
  
      // Enviar el correo electrónico al usuario
      await this.sendMailsService.sendMail({
        to: savedUserForm.email,
        subject: 'Confirmación de Formulario de Usuario',
        text: `Hola ${savedUserForm.fullName},\n\nGracias por completar el formulario. Hemos recibido tu solicitud de plan: ${selectedProgram.nombre}. Nos pondremos en contacto contigo pronto vía WhatsApp para continuar con el procedimiento.\n\nDetalles del plan:\n\nDescripción: ${selectedProgram.descripcion}\n\nIncluye:\n${selectedProgram.incluye.join('\n')}\n\nSíguenos en nuestras redes sociales para más información.\n\nSaludos,\nFundación Hogar Esperanza`,
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
                    .footer a {
                      color: #333;
                      text-decoration: none;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <img src="https://res.cloudinary.com/de5tm90td/image/upload/f_auto,q_auto/yhvkolvghzbuvg0lbxqo" alt="Fundación Hogar Esperanza" />
                    </div>
                    <p>Hola ${savedUserForm.fullName},</p>
                    <p>Gracias por completar el formulario. Hemos recibido tu solicitud de plan: <strong>${selectedProgram.nombre}</strong>. Nos pondremos en contacto contigo pronto vía WhatsApp para continuar con el procedimiento.</p>
                    <p><strong>Detalles del plan:</strong><br/>
                      <strong>Descripción:</strong> ${selectedProgram.descripcion}</p>
                    <p><strong>Incluye:</strong><ul>${selectedProgram.incluye.map(item => `<li>${item}</li>`).join('')}</ul></p>
                    <p>Síguenos en nuestras redes sociales para más información:</p>
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
                      <p>Saludos,<br/>Fundación Hogar Esperanza</p>
                    </div>
                  </div>
                </body>
              </html>`
      });

      // Enviar un correo adicional a geriatricolaesperanza.mtr@gmail.com
      // Aquí agregamos el número de WhatsApp del cliente y el icono de WhatsApp
      const whatsappLink = `https://wa.me/${savedUserForm.phone}`;

      await this.sendMailsService.sendMail({
        to: 'geriatricolaesperanza.mtr@gmail.com',
        subject: 'Nuevo Registro de Usuario en el Formulario',
        text: `Se ha registrado un nuevo usuario: ${savedUserForm.fullName}\n\nCorreo electrónico: ${savedUserForm.email}\n\nPrograma solicitado: ${selectedProgram.nombre}\n\nPuedes contactar al cliente directamente por WhatsApp en este enlace: ${whatsappLink}`,
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
                    <p><strong>Correo electrónico:</strong> ${savedUserForm.email}</p>
                    <p><strong>Programa solicitado:</strong> ${selectedProgram.nombre}</p>
                    <p><strong>Contactar por WhatsApp:</strong> <a href="${whatsappLink}" target="_blank">Haz clic aquí para chatear</a></p>
                    <div class="footer">
                      <p>Este es un mensaje automático. No responda este correo.</p>
                    </div>
                  </div>
                </body>
              </html>`
      });
  
      return savedUserForm; // Retornar el formulario de usuario creado
    } catch (error) {
      // Si hay un error, lanzar una excepción adecuada
      console.log(error);
      throw new BadRequestException('Error al crear el formulario de usuario o enviar el correo.');
    }
  }

  // Otros métodos del servicio...
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
