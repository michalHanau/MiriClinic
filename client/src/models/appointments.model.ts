
export class Appointment{
    customer_id!: number
    treatment_id!: number
    date!: Date
    start!: string
    end!: string
    notes?: string


constructor(customer_id:number, treatment_id:number, date:Date, start:string, end:string, notes?:string){
    this.customer_id=customer_id
    this.treatment_id=treatment_id
    this.date=date
    this.start=start
    this.end=end
    this.notes=notes

}
}
