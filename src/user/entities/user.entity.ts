import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity, RelationOptions, OneToMany } from "typeorm";
import { Activity } from '../../activity/entities/activity.entity';

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
    
    // RELATIONSHIPS
    @OneToMany(() => Activity, (data) => data.owner, relationOptions)
    owner: Activity[];
  
    @OneToMany(() => Activity, (data) => data.editor, relationOptions)
    editor: Activity[];
}
