<div class="w-100 bg-clr4">
    <div class="row w-100 m-0" style="min-height:100vh;padding:180px 0;">
        <div class="col-md-6 d-flex justify-content-center justify-content-md-end align-items-center pe-0 pe-md-3 pe-lg-5">
            <div class="d-flex flex-column flex-md-row justify-content-center justify-content-md-start align-items-center gap-3">
                <img src="assets/img/logo-min.png" width="74px">
                <div class="text-clr1 mt-2 text-center text-md-start">
                    <p class="m-0 fsz-12 lh-1 fw-light">Sistem Informasi<br>Pengelolaan Inventaris Sekolah</p>
                    <hr class="mt-3 mb-1">
                    <h1 class="m-0 fsz-42 fw-900">Inventix</h1>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center justify-content-md-start">
            <div class="card rounded bg-clr1 m-0 px-3 py-4 text-clr4 mt-4 mt-md-0 text-light d-flex flex-column justify-content-center" style="width:300px">
                <h4 class="m-0 text-center fw-800 mb-4">Login</h4>
                @include('templates.flashdata')
                <form action="{{ url('auth') }}" method="post">
                    @csrf 
                    <div class="mb-4 position-relative">
                        <label for="email" class="fsz-11">Email</label>
                        @error('email')
                            <p class="mx-1 my-0 fsz-9 text-warning">{{ $message }}</p>
                            <i class="fas fa-exclamation-circle position-absolute translate-center end-0 bottom-0 ms-2 mb-2 fsz-10 text-warning"></i>
                        @enderror
                        <i class="fas fa-user position-absolute translate-center start-0 bottom-0 ms-2 mb-2 fsz-12"></i>
                        <input name="email" id="email" type="email" class="text-input text-light py-2 ps-4" placeholder="Masukkan email Anda"
                        value="{{ old('email') }}">
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="password" class="fsz-11">Password</label>
                        @error('password')
                            <p class="mx-1 my-0 fsz-9 text-warning">{{ $message }}</p>
                            <i class="fas fa-exclamation-circle position-absolute translate-center end-0 bottom-0 ms-2 mb-2 fsz-10 text-warning"></i>
                        @enderror
                        <i class="fas fa-lock position-absolute translate-center start-0 bottom-0 ms-2 mb-2 fsz-12"></i>
                        <input name="password" id="password" type="password" class="text-input text-light py-2 ps-4" placeholder="Masukkan password Anda"
                        value="{{ old('password') }}">
                    </div>
                    <div class="mb-4 d-flex justify-content-end">
                        <a href="lupa-password" class="td-none text-clr4 fsz-10">Lupa password?</a>
                    </div>
                    <button type="submit" class="btn btn-clr3 rounded-pill w-100">Submit<i class="fas fa-sign-in ms-1"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>