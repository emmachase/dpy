import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Secret {

    @PrimaryColumn()
    key: string;

    @Column()
    value: string;

}
