import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationServiceService } from './notification-service.service'
import { MatDialog } from '@angular/material/dialog';
import { RoleEditDialogComponent } from '../admin-role-edit-dialog/role-edit-dialog/role-edit-dialog.component'
import {notification} from './notification'

@Component({
  selector: 'app-admin-notification-send',
  templateUrl: './admin-notification-send.component.html',
  styleUrls: ['./admin-notification-send.component.css']
})
export class AdminNotificationSendComponent implements OnInit {

  selected = 'normal'
  @Input() titleIsEmpty: any;
  @Input() messageEmpty: any;
  payload = new notification();

  constructor(public dialog: MatDialog, private notificationService: NotificationServiceService, ) { }

  ngOnInit() {
  }


  userForm = new FormGroup({
    title: new FormControl('', [Validators.required,Validators.minLength(4)]),
    message: new FormControl('', [Validators.required,Validators.minLength(4),Validators.max(200)]),
    type: new FormControl(this.selected)
  })


     customValidator(){
      
      const title = this.userForm.value.title
      const message= this.userForm.value.message

      let i: String=title.trim();
      let titleln: Number=i.length
      console.log("CustomValidtor length of title : ",titleln)

      let j: String=message.trim();
      let messageln: Number=i.length
      console.log("CustomValidtor length of message : ",messageln)

      if(messageln == 0 || titleln == 0){
        return false;
      }else{
        return true;
      }


  }

  

  onSubmit() {
    // let roleArray = [];
    // roleArray.push(this.userForm.value['roles']);
    // this.userForm.value['roles'] = roleArray;

    // this.adminService.createUser(this.userForm.value).subscribe((response: any) => {
    //     if (response.status === 200) {
    //         this.router.navigate(['home/admin/users'])
    //     }
    // }, error => console.log('error', error));


   let flag=this.customValidator()
   if(flag==false){
     this.titleIsEmpty=1
     this.messageEmpty=1
     return
   }
    this.openDialogRoleCreate(`Are you sure want send this ${this.selected} push notification`).beforeClose().subscribe ( (element) => {
      if (element) {
        console.log('Ok clicked ', element)
        console.log(this.userForm.value)
    
        this.notificationService.sendNotification(this.userForm.value).subscribe((response: any) => {
          let result=response.data.replace("\\",'')
          let obj=JSON.parse(result);
          let success=obj.success;
          let failure=obj.failure;
          let total=success+failure;
          if (response.status === 200){
            console.log(`response => ${JSON.stringify(response,null,2)}`)
             //Open Dialog and display message
             this.openDialogRoleCreate(`Notification have been sent. ${success} with 100% success rate`).beforeClose().subscribe( (element) => {
              if (element) {
                  console.log('Check error cause', element)               
              } else {
                  console.log("Cancel", element)
                  return;
              }
          })
            //this.router.navigate(['home/admin/roles'])
          }else if(response.status!=200){
    
            // console.log('-------------\n',success)
            // console.log('-------------\n',failure)
            // console.log('-------------\n',total)

            if(success>0){
            console.log('-------------\n',success)
            console.log('-------------\n',failure)
            console.log('-------------\n',total)
            //Open Dialog and display message
            this.openDialogRoleCreate(`Notification have been sent. ${success} succesfully sent and ${failure} failed`).beforeClose().subscribe ((element) => {
              if (element) {
                  console.log('Check error cause', element)               
              } else {
                  console.log("Cancel", element)
                  return;
              }
          })
            
            }else{
              alert("Failure Sending notification!")
              console.log('Error response ',response)
              console.log('-------------\n',failure)
            }
          
            //this.router.navigate(['home/admin/roles'])
          }
             
        }, (error) => {
          console.log("Error message from on submit \n" + JSON.stringify(error, null, 2))
        });
      } else {
        console.log('Cancel clicked ', element)
        // this.router.navigate([this.router.url]);
      }

    })


  }

  openDialogRoleCreate(message) {
    const dialogRef = this.dialog.open(RoleEditDialogComponent, {
      data: {
        message: `${message}`,
        buttonText: {
          ok: 'Ok',
          cancel: 'cancel'
        }
      }
    })

    return dialogRef;
  }

}
