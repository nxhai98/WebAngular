    import { Component, OnInit } from '@angular/core';
    import {AdminService} from '../_services/admin.service';
    import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
    import { EditUserComponent } from '../edit-user/edit-user.component';
    import { AddUserComponent } from '../add-user/add-user.component';
    import { user } from 'src/app/_models/User';

    @Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.css']
    })
    export class UserManagerComponent implements OnInit {
        
        listUsers;
        searchChar: string;
        currentPage = 1;
        pageDisplay: number[] = [];
        pageCount;
        constructor(
            private adminService: AdminService,
            private dialog: MatDialog,
        ) { }

        ngOnInit() {
            this.adminService.getListUser(this.currentPage).subscribe(data => {
                this.listUsers = data;
            });
            this.adminService.getPageUserCount().subscribe(count => {
                this.pageCount = count;
                for(let i = 1; i <= this.pageCount; i++){
                    this.pageDisplay.push(i);
                }
            })
        }

        openEditDialog(user){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = user;
            dialogConfig.width = '500px';
            const dialogRef = this.dialog.open(EditUserComponent,dialogConfig);

            dialogRef.afterClosed().subscribe(result => {
                if(result){
                    this.adminService.updateUser(user.id, result).subscribe(data=>{
                        this.adminService.getListUser(this.currentPage).subscribe(list=>{
                            this.listUsers = list;
                        })
                    });
                }
                
            });
        }

        openAddDialog(){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '800px';

            const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);

            dialogRef.afterClosed().subscribe(result => {
                if(result){
                    console.log(result);
                    this.adminService.addUser(result).subscribe(data =>{
                        this.currentPage = this.pageCount;
                        this.adminService.getListUser(this.pageCount).subscribe(list =>{
                            this.listUsers = list;
                        })
                    });     
                }
            });
        }
        
        removeUser(user : user){
            if(confirm("Are you sure to remove user :" + user.userName + ': ' + user.fullName)){
                this.adminService.removaUser(user.id).subscribe(data => {
                    this.adminService.getListUser(this.currentPage).subscribe(list=>{
                        this.listUsers = list;
                    })
                });//xu ly bat dong bo o day
            }
        }
        isSearch = false;
        search(){
            if(this.searchChar != ''){
                this.isSearch = true;
                this.adminService.searchUser(this.searchChar).subscribe(list => {
                this.listUsers = list;
                })
            }else{
                this.isSearch = false;
                this.adminService.getListUser(this.currentPage).subscribe(list=>{
                    this.listUsers = list;
                })
            }
            
        }

        cancel(){
            this.isSearch = false;
            this.searchChar = '';
            this.adminService.getListUser(this.currentPage).subscribe(list=>{
                this.listUsers = list;
            })
        }

        loadPage(page){
            this.currentPage = page;
            this.adminService.getListUser(page).subscribe(list =>{ 
                this.listUsers = list;
            })
        }
    }
