import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  //templateUrl: './footer.component.html',
  template:`
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
      <div class="container my-auto">
        <div class="copyright text-center my-auto">
          <span>Copyright &copy; ARB Berhad 2025</span>
        </div>
      </div>
    </footer>
    <!-- End of Footer -->
    <!-- Scroll to Top Button-->
    <!-- <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a> -->
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
