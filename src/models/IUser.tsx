class IUser{
    private firstName: string="";
    private lastName: string="";
    private userName: string="";
    private password: string="";
    private dateCreated: string="";
    private creator: IUser=new IUser();
    private userLevel: string="";
}

export default  IUser;