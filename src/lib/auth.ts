import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
    id: string;
    email: string;
    password: string;
}

// In a real application, this would be stored in a database
const ADMIN_USER: User = {
    id: '1',
    email: 'admin@montanafurniture.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
};

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: Omit<User, 'password'>): string {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
}

export function verifyToken(token: string): { id: string; email: string; iat?: number; exp?: number } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string; email: string; iat?: number; exp?: number };
    } catch (error) {
        return null;
    }
}

export async function authenticateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    if (email === ADMIN_USER.email) {
        const isValid = await verifyPassword(password, ADMIN_USER.password);
        if (isValid) {
            return {
                id: ADMIN_USER.id,
                email: ADMIN_USER.email,
            };
        }
    }
    return null;
}
