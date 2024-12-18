import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserFormDto } from './dto/create-users-form.dto';
import { SendMailsService } from '../send-mails/send-mails.service';  // Asegúrate de importar el servicio de correos
import { UsersForm } from './entities/users-form.entity';

@Injectable()
export class UsersFormService {
  constructor(
    @InjectRepository(UsersForm)
    private readonly usersFormRepository: Repository<UsersForm>, // Inyección del repositorio
    private readonly sendMailsService: SendMailsService, // Inyección del servicio de correos
  ) {}

  // Método para crear un formulario de usuario y enviar un correo
  async create(createUsersFormDto: CreateUserFormDto): Promise<UsersForm> {
    const userForm = this.usersFormRepository.create(createUsersFormDto); // Mapear el DTO a la entidad
    
    try {
      // Guardar el nuevo formulario de usuario
      const savedUserForm = await this.usersFormRepository.save(userForm);

      // Enviar el correo electrónico al usuario
      await this.sendMailsService.sendMail({
        to: savedUserForm.email,
        subject: 'Confirmación de Formulario de Usuario',
        text: `Hola ${savedUserForm.fullName},\n\nGracias por completar el formulario. Hemos recibido tu solicitud de plan: ${savedUserForm.plan}. Nos pondremos en contacto contigo pronto.\n\nSaludos.`,
        html: `<p>Hola ${savedUserForm.fullName},</p><p>Gracias por completar el formulario. Hemos recibido tu solicitud de plan: <strong>${savedUserForm.plan}</strong>. Nos pondremos en contacto contigo pronto.</p><p>Saludos.</p>`,
      });

      return savedUserForm; // Retornar el formulario de usuario creado
    } catch (error) {
      // Si hay un error, lanzar una excepción adecuada
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
