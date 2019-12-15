import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CandidateService } from 'src/app/shared/services/candidate.service';
import { Candidate } from 'src/app/shared/interfaces/candidate';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  sub: Subscription;
  candidate: Candidate;

  constructor(
    private routes: ActivatedRoute,
    private candidateService: CandidateService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    const candidateObs = this.routes.paramMap
      .pipe(
        switchMap(params => {
          const id: number = parseInt(params.get('id'));

          return this.candidateService.getById(id);
        })
      );

    this.sub = candidateObs
      .subscribe(candidate => {
        this.candidate = candidate;
      }, () => {
        this.toastService.error('Não foi possível recuperar os dados deste candidato, tente novamente mais tarde!');
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
