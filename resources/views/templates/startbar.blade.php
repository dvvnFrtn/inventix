<div class="modal fade" id="modal-profile" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-light rounded-m">
            <div class="modal-header bg-clr2 text-clr5 shadow-m">
                <h4 class="modal-title fw-bold">{{ session()->get('user')['user_fullname'] }}</h4>
                <div class="ms-auto hover bg-clr2 border-clr5 text-clr5 rounded-circle he-28 we-28 d-flex justify-content-center align-items-center cursor-pointer" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fas fa-close fsz-10 m-0 p-0"></i>
                </div>
            </div>
            <div class="modal-body">
                <div class="w-100">
                    <a href="{{ url('profil') }}" class="d-flex align-items-center gap-1 td-none hover py-2 border-bottom-clr2 bg-light text-clr1">
                        <i class="fas fa-user we-30 d-flex justify-content-center"></i>
                        <p class="m-0">Profil saya</p>
                    </a>
                    <a href="{{ url('logout') }}" class="d-flex align-items-center gap-1 td-none hover py-2 bg-light text-danger">
                        <i class="fas fa-sign-out we-30 d-flex justify-content-center"></i>
                        <p class="m-0">Log keluar</p>
                    </a>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="w-100 d-flex align-items-center overflow-hidden bg-clr5 px-1 gap-2 text-light" style="height:5vh;">
    <div id="bar" class="cursor-pointer">
        <i class="fas fa-bars"></i>
    </div>
    <p class="m-0 fsz-8">Sistem Informasi Inventix</p>
    <a href="#" data-bs-toggle="modal" data-bs-target="#modal-profile" class="ms-auto me-2 text-clr4">
        <i class="fas fa-user"></i>
    </a>
</div>
<div class="w-100 d-flex overflow-hidden" style="height:95vh;">
    <div id="menu" class="flex-shrink-0 bg-clr1 text-clr4 overflow-y-scroll overflow-x-hidden" style="width:200px;height:95vh;">
        <div class="mx-1 mt-3 fsz-10">
            @foreach ($menu as $x)
                <a href="{{ url($x['url']) }}" class="py-2 d-block td-none hover {{ ($x['label'] === $page) ? 'bg-clr4 text-clr1' : 'bg-clr1 text-light' }}">
                    <div class="d-flex justify-content-start align-items-center gap-1 mx-2">
                        <i class="{{ $x['icon'] }} we-20 d-flex justify-content-center"></i>
                        <p class="m-0 me-4 lh-1">{{ $x['name'] }}</p>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
    <div class="flex-grow-1" style="height:95vh;">
        <div class="bg-clr2 d-flex align-items-center p-3" style="height:5vh">
            <p class="m-0 fw-bold">{{ $name }}</p>
        </div>
        <div class="overflow-y-scroll" style="height:90vh">
            <div class="p-3">
                lorem*90
            </div>

        </div>
    </div>
</div>