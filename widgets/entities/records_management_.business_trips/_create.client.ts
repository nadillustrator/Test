/* Client scripts module */

async function onDateChange(): Promise<void> {
    Context.data.info ="";
    Context.data.duration = undefined;
    Context.data.sum_daily_allowance = undefined;
    if (Context.data.start_date && Context.data.end_date){
        if (Context.data.end_date.after(Context.data.start_date) || Context.data.end_date.equal(Context.data.start_date)){
           //приводим даты к типу TDatetime
            const start = Context.data.start_date.asDatetime(new TTime(0,0,0,0));
            const end = Context.data.end_date.asDatetime(new TTime(23,59,0,0));
            //расчет продолжительности командировки в днях
            Context.data.duration = Math.floor(end.sub(start).hours/24)+1;
            //расчет суммы суточных исходя из стандартного значения 700 руб/сутки
            Context.data.sum_daily_allowance = new Money(700, 'RUB').multiply(Context.data.duration);
            Context.data.info ="";
            } 
            else {
            Context.data.info = "Дата начала поездки не должна быть больше даты окончания!"
            Context.data.duration = undefined;
            Context.data.sum_daily_allowance = undefined;
        }
    } 
}
async function onInit() {
    Context.data.emloyee = await System.users.getCurrentUser();
    if(Context.data.emloyee){
        const chiefs = await Context.data.emloyee.getChiefs();
        if (chiefs){
            Context.data.chief = chiefs[0];
        }
    }
}
