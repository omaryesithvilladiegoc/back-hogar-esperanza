import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserFormDto } from './dto/create-users-form.dto';
import { SendMailsService } from '../send-mails/send-mails.service'; // Asegúrate de importar el servicio de correos
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
    const userForm = this.usersFormRepository.create(createUsersFormDto); 

    // Definir los programas disponibles
    const programs = [
      {
        id: 1,
        nombre: 'Hogar permanente compartido',
        descripcion: 'Este programa está diseñado específicamente para familias que buscan ofrecer a sus adultos mayores un hogar definitivo, seguro y lleno de calidad de vida.',
        incluye: [
          'Habitación compartida con baño compartido.',
          'Tres comidas principales y 2 meriendas.',
          'Aseo y mantenimiento a la habitación diario.',
          'Cuidado de pertenencias.',
          'Lavado y planchado de ropa.',
          'Salidas con acompañamiento (previamente autorizadas por su responsable directo).',
          'Asistencia en comunicación virtual con familiares.',
          'Acompañamiento de auxiliares de enfermería las 24 h.',
          'AMI, servicio de asistencia primaria y emergencias.',
          'Actividades recreativas todas las semanas.',
          'Visitas semanales de especialistas de la salud integral.',
          'Dinámicas de integración familiar los fines de semana.',
          'Suministro de medicamentos autorizados por sus médicos tratantes.',
          'Toma de signos vitales.',
          'Apoyo en las actividades de la vida diaria.',
          'Vigilancia nocturna de comportamiento al dormir.',
          'Afiliación a un seguro funerario si no lo posee.'
        ]
      },
      {
        id: 2,
        nombre: 'Hogar permanente VIP',
        descripcion: 'Nuestro programa VIP está meticulosamente diseñado para familias que buscan proporcionar a sus adultos mayores un hogar definitivo, seguro y lleno de una calidad de vida excepcional.',
        incluye: [
          'Habitación privada con baño independiente.',
          'Aire acondicionado.',
          'Tres comidas principales y 2 meriendas.',
          'Aseo y mantenimiento a la habitación diario.',
          'Cuidado de pertenencias.',
          'Lavado y planchado de ropa.',
          'Salidas con acompañamiento (previamente autorizadas por su responsable directo).',
          'Asistencia en comunicación virtual con familiares.',
          'Acompañamiento de auxiliares de enfermería las 24 h.',
          'AMI, servicio de asistencia primaria y emergencias.',
          'Actividades recreativas todas las semanas.',
          'Visitas semanales de especialistas de la salud integral.',
          'Dinámicas de integración familiar los fines de semana.',
          'Suministro de medicamentos autorizados por sus médicos tratantes.',
          'Toma de signos vitales.',
          'Apoyo en las actividades de la vida diaria.',
          'Vigilancia nocturna de comportamiento al dormir.',
          'Afiliación a un seguro funerario si no lo posee.'
        ]
      },
      {
        id: 3,
        nombre: 'Hogar permanente VIP compartido',
        descripcion: 'Nuestro programa VIP compartido ofrece a familias la posibilidad de brindar a sus adultos mayores un hogar seguro y de alta calidad.',
        incluye: [
          'Habitación compartida con baño compartido.',
          'Aire acondicionado.',
          'Tres comidas principales y 2 meriendas.',
          'Aseo y mantenimiento a la habitación diario.',
          'Cuidado de pertenencias.',
          'Lavado y planchado de ropa.',
          'Salidas con acompañamiento (previamente autorizadas por su responsable directo).',
          'Asistencia en comunicación virtual con familiares.',
          'Acompañamiento de auxiliares de enfermería las 24 h.',
          'AMI, servicio de asistencia primaria y emergencias.',
          'Actividades recreativas todas las semanas.',
          'Visitas semanales de especialistas de la salud integral.',
          'Dinámicas de integración familiar los fines de semana.',
          'Suministro de medicamentos autorizados por sus médicos tratantes.',
          'Toma de signos vitales.',
          'Apoyo en las actividades de la vida diaria.',
          'Vigilancia nocturna de comportamiento al dormir.',
          'Afiliación a un seguro funerario si no lo posee.'
        ]
      },
      {
        id: 4,
        nombre: 'Hogar de vacaciones',
        descripcion: 'Nuestro programa está diseñado para aquellos abuelitos que necesiten cuidados temporales o de corta estancia, con una duración mínima de 15 días.',
        incluye: [
          'Tres comidas principales y 2 meriendas.',
          'Aseo y mantenimiento a la habitación diario.',
          'Cuidado de pertenencias.',
          'Lavado y planchado de ropa.',
          'Salidas con acompañamiento (previamente autorizadas por su responsable directo).',
          'Asistencia en comunicación virtual con familiares.',
          'Acompañamiento de auxiliares de enfermería las 24 h.',
          'AMI, servicio de asistencia primaria y emergencias durante su estancia.',
          'Actividades recreativas.',
          'Vigilancia de toma de medicamentos autorizados por sus médicos tratantes.',
          'Toma de signos vitales.',
          'Apoyo en las actividades de la vida diaria.',
          'Vigilancia nocturna.'
        ]
      },
      {
        id: 5,
        nombre: 'Hogar cuidado diario',
        descripcion: 'Nuestro plan de cuidado diario está diseñado para garantizar que cada residente reciba la atención y el apoyo que necesita en su rutina diaria.',
        incluye: [
          'Tres comidas principales y 2 meriendas.',
          'Aseo y mantenimiento a la habitación diario.',
          'Cuidado de pertenencias.',
          'Salidas con acompañamiento (previamente autorizadas por su responsable directo).',
          'Asistencia en comunicación virtual con familiares.',
          'Acompañamiento de auxiliares de enfermería durante su estancia.',
          'AMI, servicio de asistencia primaria y emergencias durante su estancia.',
          'Actividades recreativas.',
          'Vigilancia de toma de medicamentos autorizados por sus médicos tratantes.',
          'Toma de signos vitales.',
          'Apoyo en las actividades de la vida diaria.'
        ]
      }
    ];

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
        text: `Hola ${savedUserForm.fullName},\n\nGracias por completar el formulario. Hemos recibido tu solicitud de plan: ${selectedProgram.nombre}. Nos pondremos en contacto contigo pronto vía WhatsApp para continuar con el procedimiento.\n\nNo olvides visitar nuestro blog: www.fundacionhogaresperanza.com/posts para más información.\n\nSaludos,\nFundación Hogar Esperanza`,
        html: `<p>Hola ${savedUserForm.fullName},</p><p>Gracias por completar el formulario. Hemos recibido tu solicitud de plan: <strong>${selectedProgram.nombre}</strong>. Nos pondremos en contacto contigo pronto vía WhatsApp para continuar con el procedimiento.</p><p>No olvides visitar nuestro blog: <a href="https://www.fundacionhogaresperanza.com/posts">www.fundacionhogaresperanza.com/posts</a> para más información.</p><p>Saludos,<br/>Fundación Hogar Esperanza</p>`,
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
