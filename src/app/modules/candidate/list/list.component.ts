import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Candidate } from 'src/app/shared/interfaces/candidate';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  $candidates: Observable<Candidate[]>;

  constructor(
    private candidateService: CandidateService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getAllCandidates();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getAllCandidates() {
    this.$candidates = this.candidateService.getAll();
  }

  delete(id: number) {
    this.sub = this.candidateService
      .delete(id)
      .subscribe(() => {
        this.toastService.success('Candidato excluído');
        this.getAllCandidates();
      }, () => {
        this.toastService.error('Não foi possível exluir este candidato');
      });
  }

}
