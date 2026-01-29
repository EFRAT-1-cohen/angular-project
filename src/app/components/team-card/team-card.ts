import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsModel, AddMemberModel } from '../../models/teams.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './team-card.html',
  styleUrls: ['./team-card.css'] 
})
export class TeamCard {
  team = input.required<TeamsModel>();
  addMember = output<AddMemberModel>();
  deleteTeam = output<number>();
  
  isFormOpen = false;
  memberControl = new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]);
  
  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    if (!this.isFormOpen) {
      this.memberControl.reset();
    }
  }
  
  onsubmit() {
    if (this.memberControl.invalid || !this.memberControl.value) return;
    const memberData: AddMemberModel = {
      userId: Number(this.memberControl.value),
      role: 'member'
    };
    this.addMember.emit(memberData);
    this.toggleForm();
  }
  
  onDeleteTeam() {
    this.deleteTeam.emit(this.team().id);
  }
}