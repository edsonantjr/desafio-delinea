import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Candidate } from '../../interfaces/candidate';
import { CandidateService } from '../../services/candidate.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() candidate: Candidate;
  public form: FormGroup;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.form) {
      this.form.patchValue({
        full_name: this.candidate.full_name,
        cpf: this.candidate.cpf,
        rg: this.candidate.rg,
        birth_date: this.candidate.birth_date,
        phone: this.candidate.phone,
        username: this.candidate.username,
        email: this.candidate.email,
        password: this.candidate.password
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initForm() {
    this.form = this.fb.group({
      full_name: [null, Validators.required],
      cpf: [null, Validators.required],
      rg: [null, Validators.required],
      birth_date: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submit(candidate: Candidate) {
    if (this.form.valid) {
      if (!this.candidate) {
        this.register(candidate);
      } else {
        this.update(candidate);
      }
    }
  }

  register(candidate: Candidate) {
    this.sub = this.candidateService
      .register(candidate)
      .subscribe(res => {
        this.toastService.success('Candidato cadastrado');
        this.router.navigate(['']);
      }, () => {
        this.toastService.error('Não foi possível realizar seu cadastro, tente novamente mais tarde!');
      });
  }

  update(candidate: Candidate) {
    this.sub = this.candidateService
      .update(candidate, this.candidate.id)
      .subscribe(res => {
        this.toastService.success('Candidato atualizado');
        this.router.navigate(['/candidate']);
      }, err => {
        console.log(err);
        this.toastService.error('Não foi possível atualizar este candidato, tente novamente mais tarde!');
      });
  }

  cancel() {
    if (this.candidate) {
      this.router.navigate(['/candidate']);
    } else {
      this.router.navigate(['']);
    }
  }
}
