import { DAnuncios } from './../Adimin';
import { Component } from '@angular/core';
import { SAdminService } from '../s-admin.service';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    danuncios: DAnuncios[] = [];
    isEditing: boolean = false;
    submitted: boolean = false;
    formGroupDAnuncios: FormGroup;

    constructor(
      private sadminService: SAdminService,
      private formBuilder: FormBuilder
    ) {
      this.formGroupDAnuncios = formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required] ],
        descricao: ['',[Validators.required] ],
        data_de_validade: ['',[Validators.required] ],
        email: ['',[Validators.required]],
        imagem: ['',[Validators.required]],
      });
    }
    ngOnInit(): void {
      this.loadDAnuncios();
    }
    loadDAnuncios() {
      this.sadminService.getAnuncio().subscribe({
        next: (data) => (this.danuncios = data),
      });
    }
    save() {


        if (this.isEditing) {
          this.sadminService.update(this.formGroupDAnuncios.value).subscribe({
            next: () => {
              this.loadDAnuncios();
              this.formGroupDAnuncios.reset();
              this.isEditing = false;
              this.submitted =false;
            },
          });
        } else {
          this.sadminService.save(this.formGroupDAnuncios.value).subscribe({
            next: (data) => {
              this.danuncios.push(data);
              this.formGroupDAnuncios.reset();
              this.submitted =false;
            },
          });
        }



    }

    edit(danuncios: DAnuncios) {
      this.formGroupDAnuncios.setValue(danuncios);
      this.isEditing = true;
    }

    delete(danuncios: DAnuncios) {
      this.sadminService.delete(danuncios).subscribe({
        next: () => this.loadDAnuncios(),
      });
    }
    clear() {
      this.formGroupDAnuncios.reset();
      this.isEditing = true;
      this.submitted = false;
    }

    get name() : any{
      return this.formGroupDAnuncios.get("name");
    }
    get email() : any{
      return this.formGroupDAnuncios.get("email");
    }
}

