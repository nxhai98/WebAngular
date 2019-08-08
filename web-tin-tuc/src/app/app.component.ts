    import { Component, OnInit } from '@angular/core';
    import {AuthenticationService} from './_servises/authentication.service';
    import {Router, ActivatedRoute} from '@angular/router';
    import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

    import { user } from './_models/User';
    import { Catalog, CatalogFamily } from './_models/Catalog';
    import {UserService} from './_servises/user.service';
    import { ProfileComponent } from './profile/profile.component';
    import { ChangePasswdComponent } from './change-passwd/change-passwd.component';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
        logOutAvalid = false;
        currentUser: user;
        listCatalog: Catalog[];
        listRootCatalog: CatalogFamily[] = [];
        constructor(
            private authentucationService: AuthenticationService,
            private router: Router,
            private userService: UserService,
            private route: ActivatedRoute,
            private dialog: MatDialog,
        ) {}

        title = 'web-tin-tuc';
        logout() {
            this.authentucationService.logOut();
            this.logOutAvalid = false;
        }
        ngOnInit() {
            this.userService.getListCatalog().subscribe(catalogs => {
                this.listCatalog = catalogs;
                catalogs.forEach(item => {
                    if (item.parentId == null) {
                        this.listRootCatalog.push({catalog: item, child: [], displayChild: false});
                    }
                });
                this.listCatalog.forEach(item => {
                    this.listRootCatalog.forEach(root => {
                        if (item.parentId === root.catalog.id) {
                            root.child.push(item);
                        }
                    });
                });
            });
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

        userInSigin() {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (this.currentUser) {
                return true;
            } else {
                return false;
            }
        }

        displayClildCatalog(id) {
            this.listRootCatalog.forEach(root => {
                if (root.catalog.id === id) {
                    root.displayChild = true;
                }
            });
        }

        isOpen() {
            return !this.router.isActive('admin/dashboard', true);
        }

        openProfileDialog() {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '600px';
            dialogConfig.data = this.authentucationService.currentUserValue.id;
            const dialogRef = this.dialog.open(ProfileComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {

            });
        }

        openChangePassDialog() {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '600px';
            const dialogRef = this.dialog.open(ChangePasswdComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
            });
        }
    }
