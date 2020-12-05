import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Upload {

    @PrimaryColumn({ length: 127 })
    name: string;

    @Column()
    filePath: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @OneToMany(() => Tag, tag => tag.upload)
    tags: Tag[];

    @Column()
    description: string;

}
