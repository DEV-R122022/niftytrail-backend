import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity, RelationOptions } from "typeorm";

const relationOptions: RelationOptions = {
    cascade: ["insert", "update", "remove"],
};
  
@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
