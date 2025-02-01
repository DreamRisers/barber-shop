import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive, IsEnum, IsDate, MinLength, MaxLength, IsPhoneNumber, IsUUID } from 'class-validator';
import { AppointmentStatus, PaymentMethod } from "../entities/appointment.entity";

export class CreateAppointmentDTO {
    @ApiProperty({
        description: 'Monto del servicio',
        example: 3500,
        type: Number,
    })
    @IsInt()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: 'Servicios aplicados en el turno.',
        example: 'Corte de pelo, teñido, etc.',
        type: String
    })
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    services: string;

    @ApiProperty({
        description: 'Nombre del cliente.',
        example: 'Juan Pérez',
        type: String,
        maxLength: 100,
    })
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    client_name: string;

    @ApiProperty({
        description: 'Número de teléfono del cliente.',
        example: '11623456789',
        type: String,
    })
    @IsPhoneNumber()
    client_phone: string;

    @ApiProperty({
        description: 'Estado del turno.',
        enum: AppointmentStatus,
        example: AppointmentStatus.PENDING,
    })
    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;

    @ApiProperty({
        description: 'Método de pago.',
        enum: PaymentMethod,
        example: PaymentMethod.CASH,
    })
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @ApiProperty({
        description: 'Fecha del turno.',
        type: String,
        format: 'date-time',
        example: '2025-01-24T10:00:00Z',
    })
    @IsDate()
    date: Date;

    @IsUUID()
    barber: string;

    @IsUUID()
    branch: string;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {}