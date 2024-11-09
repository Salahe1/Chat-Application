import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MySharedService } from '../../services/my-shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchTerm: string = '';
  allUsers: any[] = [];
  filteredUsers: any[] = [];
  usersFetched: boolean = false;
  isDropdownOpen: boolean = false;
  showHeader: boolean = true;

    // Reference to the search form container
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  constructor(private router: Router, private userService: UserService, private sharedService: MySharedService) {}

  ngOnInit(): void {
    // Subscribe to router events to check header visibility
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHeaderVisibility();
      });

       // Subscribe to authentication state
      //  this.isAuthenticated = this.authService.isAuthenticated();
      //  this.authService.token$.subscribe(token => {
      //    this.isAuthenticated = !!token;
      //  });
      
    // Initial check on load
    this.updateHeaderVisibility();
  }

  onUserClick(userId: number) {
    this.sharedService.selectUser(userId);
  }


  ngAfterViewInit(): void {
    // searchContainer is now guaranteed to be initialized
  }


  onFocus(): void {
    if (!this.usersFetched) {
      this.fetchAllUsers();
      this.usersFetched = true;
      this.isDropdownOpen = true; // Open the dropdown when focusing the input
    }
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = users;
    });
  }


  filterUsers(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user =>
      user.username.toLowerCase().includes(searchTermLower)
    );
    this.isDropdownOpen = this.filteredUsers.length > 0; // Show dropdown if there are filtered results
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false; // Close dropdown if clicked outside
    }
  }

  
  private updateHeaderVisibility(): void {
    // Determine if the header should be shown
    this.showHeader = this.router.url !== '/user/Login' && this.router.url !== '';
  }
}
