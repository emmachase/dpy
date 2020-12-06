import {Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Upload {

    @PrimaryGeneratedColumn()
    id: number


    @Column({ unique: true, length: 127 })
    name: string;

    @Column()
    filePath: string;

    @Column()
    mime: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @OneToMany(() => Tag, tag => tag.upload, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    tags: Tag[];

    @Column()
    description: string;

}
