const screens=[...document.querySelectorAll('.screen')];
function go(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
document.querySelector('.brand').addEventListener('click',()=>go('home'));
document.querySelectorAll('.mapPoint').forEach(b=>b.addEventListener('click',()=>document.getElementById('mapInfo').textContent=b.dataset.info));
document.querySelectorAll('.subject').forEach(b=>b.addEventListener('click',()=>document.getElementById('subjectInfo').textContent=b.dataset.sub));

document.getElementById('calcBtn').onclick=()=>{
 const e=+document.getElementById('elec').value||0,c=+document.getElementById('car').value||0,w=+document.getElementById('waste').value||0;
 let score=Math.max(0,100-Math.round(e*.12+c*.08+w*3));
 document.getElementById('score').textContent=score;
 document.getElementById('scoreText').textContent=score>=70?'مؤشر تعليمي جيد — جرّب إضافة حل آخر في المحاكاة.':score>=45?'يمكن تحسين المؤشر عبر الطاقة والنقل وترشيد الموارد.':'ابدأ بإجراءين عمليين ثم أعد الحساب للمقارنة.';
};

const ghg=document.getElementById('ghg');
function updateGHG(){document.getElementById('ghgValue').textContent=ghg.value+'%';document.getElementById('ghgBar').style.width=ghg.value+'%'}
ghg.oninput=updateGHG;updateGHG();
document.getElementById('water').onchange=e=>{document.getElementById('waterResult').textContent=e.target.value==='0'?'اختر إجراءً.':'النتيجة التعليمية: يمكن أن يساهم هذا الإجراء في رفع كفاءة إدارة المياه والتكيف.'};

document.querySelectorAll('.solution').forEach(x=>x.onchange=()=>{
 let reduction=[...document.querySelectorAll('.solution:checked')].reduce((a,b)=>a+ +b.value,0);
 let score=Math.min(100,50+reduction);
 document.getElementById('simScore').textContent=score;
 document.getElementById('simBar').style.width=score+'%';
 document.getElementById('simMessage').textContent=score>=85?'تركيبة حلول قوية داخل النموذج التعليمي.':score>=70?'نتيجة جيدة — جرّب إضافة حل آخر.':'استمر في تجربة حلول مختلفة.';
});

const questions=[
 {q:'أي إجراء يمثل مثالاً على التكيف مع تغير المناخ؟',a:['إهمال توقعات الطقس','تحسين إدارة الموارد والبنية التحتية','زيادة استهلاك الوقود'],c:1},
 {q:'أي تقنية يمكن أن تدعم خفض الانبعاثات؟',a:['الطاقة الشمسية','زيادة الهدر','حرق المخلفات'],c:0},
 {q:'ما دور البيانات الرقمية في العمل المناخي؟',a:['لا دور لها','تساعد في الرصد والتحليل واتخاذ القرار','تمنع التوعية'],c:1}
];
let qi=0;
function renderQ(){let x=questions[qi];document.getElementById('qText').textContent=(qi+1)+'. '+x.q;document.getElementById('answers').innerHTML=x.a.map((v,i)=>`<button class="quizAnswer" data-i="${i}">${v}</button>`).join('');document.getElementById('qResult').textContent='';document.querySelectorAll('.quizAnswer').forEach(b=>b.onclick=()=>{let ok=+b.dataset.i===x.c;b.classList.add(ok?'correct':'wrong');document.getElementById('qResult').textContent=ok?'إجابة صحيحة ✔':'إجابة غير صحيحة — راجع الفكرة ثم جرّب السؤال التالي.'})}
renderQ();document.getElementById('nextQ').onclick=()=>{qi=(qi+1)%questions.length;renderQ()};

const advice={
air:'ابدأ بالرصد: حدّد مصدر المشكلة، اجمع بيانات، ثم قارن النتائج بإجراءات تقليل الانبعاثات وتحسين كفاءة النقل والطاقة.',
water:'ابدأ بقياس الاستهلاك والفواقد، ثم جرّب الترشيد وإعادة الاستخدام والري الذكي مع متابعة النتائج.',
energy:'قِس الاستهلاك، حدّد الاستخدامات الأعلى، ثم جرّب كفاءة الطاقة والطاقة المتجددة وقارن المؤشر قبل وبعد.',
waste:'قسّم المخلفات إلى أنواع، قلّل المصدر، ثم طبّق إعادة الاستخدام والفرز وإعادة التدوير مع متابعة الكميات.'
};
document.getElementById('askAI').onclick=()=>{let p=document.getElementById('problem').value;document.getElementById('aiAnswer').textContent=advice[p]||'اختر مشكلة أولاً.'};

go('home');
let simCount=0, quizCorrect=0, aiCount=0;
document.querySelectorAll('.solution').forEach(x=>x.addEventListener('change',()=>{simCount=[...document.querySelectorAll('.solution:checked')].length;}));
const oldRenderQ=renderQ;
document.getElementById('nextQ').addEventListener('click',()=>{});
document.getElementById('askAI').addEventListener('click',()=>{if(document.getElementById('problem').value) aiCount++;});
document.getElementById('refreshDash').onclick=()=>{
 document.getElementById('dashSim').textContent=simCount;
 document.getElementById('dashQuiz').textContent=quizCorrect;
 document.getElementById('dashAI').textContent=aiCount;
 let score=Math.min(100,50+simCount*7+quizCorrect*5+aiCount*4);
 document.getElementById('finalScore').textContent=score;
 document.getElementById('finalTitle').textContent=score>=80?'مستكشف مناخي رقمي متقدم':score>=65?'متعلم مناخي نشط':'رحلة المناخ تبدأ بقرار';
 document.getElementById('finalText').textContent='النتيجة تعليمية لعرض رحلة الطالب داخل المشروع، وليست تقييمًا علميًا أو رسميًا.';
};

let city={heat:70,water:65,carbon:75,budget:100,used:0};
function renderCity(){
 document.getElementById('heat').textContent=city.heat;
 document.getElementById('cityWater').textContent=city.water;
 document.getElementById('cityCarbon').textContent=city.carbon;
 document.getElementById('budget').textContent=city.budget;
 let health=Math.max(0,Math.round(100-(city.heat+city.water+city.carbon)/3));
 document.getElementById('cityBar').style.width=health+'%';
}
document.querySelectorAll('.cityChoice').forEach(b=>b.onclick=()=>{
 let cost=+b.dataset.cost;
 if(city.budget<cost){document.getElementById('cityMessage').textContent='الميزانية لا تكفي لهذا الإجراء. جرّب مزيجًا آخر.';return}
 city.budget-=cost;
 city.heat=Math.max(0,city.heat-(+b.dataset.heat));
 city.water=Math.max(0,city.water-(+b.dataset.water));
 city.carbon=Math.max(0,city.carbon-(+b.dataset.carbon));
 city.used++;
 document.getElementById('cityMessage').textContent=city.used>=3?'المدينة بدأت تتحسن! قارن بين الأثر والتكلفة ثم قرر إن كنت ستكمل.':'قرار مسجل. اختر الإجراء التالي وفق الموارد المتاحة.';
 renderCity();
});
document.getElementById('resetCity').onclick=()=>{city={heat:70,water:65,carbon:75,budget:100,used:0};document.getElementById('cityMessage').textContent='ابدأ باختيار إجراء. تذكّر: القرار الجيد يوازن بين التكلفة والأثر.';renderCity()};
renderCity();
