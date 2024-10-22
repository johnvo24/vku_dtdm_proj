import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    constructor(username: string, password: string, role: string) {
        this.username = username;
        this.password = password;
        this.role = role;
        // 'id' sẽ được gán giá trị tự động khi sử dụng TypeORM
    }
}
