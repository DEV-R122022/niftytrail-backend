import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity("activity")
export class Activity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    origin: string;
  
    @Column()
    details: string;
    
    @Column()
    ipAddress: string;    
    
    @Column()
    type: string;   

    @CreateDateColumn()
    createdAt?: Date;
  
    @UpdateDateColumn()
    updatedAt?: Date;
  
    /**
     * relationships
     */
    @ManyToOne(() => User, (data) => data.owner)
    @JoinColumn({ name: "owner" })
    owner: User;
  
    @ManyToOne(() => User, (data) => data.editor)
    @JoinColumn({ name: "editor" })
    editor: User;
}
