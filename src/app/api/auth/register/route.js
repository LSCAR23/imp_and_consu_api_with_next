import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import QRCode from 'qrcode'; 

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, userName, password } = await req.json();

       
        const existingUser = await prisma.user.findUnique({
            where: { userName },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 400 });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const twoFactorSecret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(userName, 'MyApp', twoFactorSecret);

       
        const newUser = await prisma.user.create({
            data: {
                email,
                userName,
                password: hashedPassword,
                twoFactorSecret,
            },
        });

         
        const qrCode = await QRCode.toDataURL(otpauthUrl);

        return new Response(
            JSON.stringify({ message: 'Usuario registrado exitosamente', qrCode }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error al registrar el usuario' }), { status: 500 });
    }
}
