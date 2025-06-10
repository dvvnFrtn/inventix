@if(session()->has('success'))
    <div class="alert alert-success fade show text-center fsz-10 position-relative" role="alert">
        {{ session()->get('success') }}
        <button type="button" class="position-absolute he-12 fsz-10 border-none bg-transparent text-success" style="top:2px;right:0;" data-bs-dismiss="alert" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    </div>
@endif
@if(session()->has('error'))
    <div class="alert alert-danger fade show text-center fsz-10" role="alert">
        {{ session()->get('error') }}
        <button type="button" class="position-absolute fsz-10 border-none bg-transparent text-danger" style="top:2px;right:0;" data-bs-dismiss="alert" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    </div>
@endif
@if(session()->has('warning'))
    <div class="alert alert-warning fade show text-center fsz-10" role="alert">
        {{ session()->get('warning') }}
        <button type="button" class="position-absolute fsz-10 border-none bg-transparent text-warning" style="top:2px;right:0;" data-bs-dismiss="alert" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    </div>
@endif
