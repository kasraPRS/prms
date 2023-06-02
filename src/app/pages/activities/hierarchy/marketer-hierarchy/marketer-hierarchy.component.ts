import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AuthService } from 'src/app/modules/auth';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { Team_GetMarketerHierarchyDTO } from 'src/app/_requests/team/teamModel';
import { MarketerUser } from 'src/app/_services/marketer-user.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */

@Component({
  selector: 'prms-marketer-hierarchy',
  templateUrl: './marketer-hierarchy.component.html',
  styleUrls: ['./marketer-hierarchy.component.scss']
})
export class MarketerHierarchyComponent implements OnInit {
  treeControl = new NestedTreeControl<Team_GetMarketerHierarchyDTO>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Team_GetMarketerHierarchyDTO>();

  constructor(
    private teamrHttpService: TeamHttpService,
    public authService: AuthService,
    private marketerUser: MarketerUser,
    private cdr: ChangeDetectorRef
  ) { this.dataSource.data = []; }

  ngOnInit(): void {
    this.getData();
  }
  hasChild = (_: number, node: Team_GetMarketerHierarchyDTO) => !!node.children && node.children.length > 0;
  getData() {

    this.teamrHttpService.GetMarketerHierarchy({ userId: this.marketerUser.marketer.id }).subscribe(res => {
      this.dataSource.data = res;
      this.treeControl.dataNodes = res;
      this.treeControl.expandAll();
      this.cdr.detectChanges();
    });

  }
}
